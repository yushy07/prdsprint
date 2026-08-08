import { supabase } from '@/lib/supabase';

export async function sendSupportMessage(message: string): Promise<any> {
  const { data, error } = await supabase.functions.invoke("support", {
    body: {
      message: message.trim(),
    },
  });

  if (error) {
    throw error;
  }
  
  if (data && data.error) {
    throw data;
  }

  return data;
}
