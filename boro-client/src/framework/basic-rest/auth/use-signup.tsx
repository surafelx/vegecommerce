import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

export interface SignUpInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function signUp(input: SignUpInputType) {
  return {
    token: `${input.email}`.split('').reverse().join(''),
  };
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: SignUpInputType) => signUp(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
