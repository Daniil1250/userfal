
import { supabase } from '../connect/supabaseClient'

export const insertData = async (data) => {
  const { data: responseData, error } = await supabase
    .from('test') 
    .insert([data]);

  if (error) {
    console.error('Error inserting data:', error);
    return null;
  }
  return responseData;
};
