
import { supabase } from '../connectPost/supabaseClient'

export const insertData = async (data) => {
  const { data: responseData, error } = await supabase
    .from('post') 
    .insert([data]);

  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return responseData;
};
