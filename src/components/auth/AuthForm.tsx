import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock, Mail } from 'lucide-react';

interface AuthFormProps {
  email: string;
  password: string;
  loading: boolean;
  isLogin: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthForm({
  email,
  password,
  loading,
  isLogin,
  onEmailChange,
  onPasswordChange,
  onSubmit
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={onEmailChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#ea6565] hover:bg-[#d45151]"
        disabled={loading}
      >
        {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
      </Button>
    </form>
  );
}