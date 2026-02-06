import { supabase } from "./supabase";

// Register User
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: "user",
      },
      emailRedirectTo: `${import.meta.env.VITE_API_URL}/login`
    }
  });
  return { user: data.user, error }
}

// Login user
export const signIn = async (email: string, password: string) => {
  const { data, error, } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { user: data.user, error };
};

// logout user
export const signOut = async () => {
  await supabase.auth.signOut();
}

// OAuth
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) {
    console.log("OAuth error: ", error.message);
  }
}

export const signInWithGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })
  if (error) {
    console.error("OAuth error: ", error.message);
  }
}