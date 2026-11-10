import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import { useAuth } from '@/hooks/useAuth';
import { getAuthErrorMessage } from '@/lib/authErrors';

export default function LogoutPage() {
  const { signOut } = useAuth();
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    signOut()
      .then(() => setFinished(true))
      .catch((err: unknown) => setError(getAuthErrorMessage(err)));
  }, [signOut]);

  if (finished) return <Navigate to="/login" replace />;

  return (
    <AuthLayout
      title={error ? 'Could not sign out' : 'Signing you out'}
      subtitle={error ?? 'Just a moment while we end your session.'}
      footer={
        error ? (
          <Link to="/dashboard" className="font-medium text-emerald-700 transition hover:text-emerald-800">
            Back to dashboard
          </Link>
        ) : null
      }
    >
      <div className="flex flex-col items-center gap-5">
        {!error && <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />}
      </div>
    </AuthLayout>
  );
}
