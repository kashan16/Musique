"use client";

import {
  useSessionContext,
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useAuthModel from '@/hooks/useAuthModel';
import Model from './Model';

const AuthModel = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModel();
  
  const supabaseClient = useSupabaseClient();


  interface AuthModel {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

  return (
    <Model 
      title="Welcome back" 
      description="Login to your account." 
      isOpen={isOpen} 
      onChange={onChange} 
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={['google','facebook']}
        //TODO : create auth objects for google and facebook for login and sign in process
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e'
              }
            }
          }
        }}
        theme="dark"
      />
    </Model>
  );
}

export default AuthModel;