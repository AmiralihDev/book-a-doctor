// import { createClient } from "@supabase/supabase-js";

import axios from "axios";

// const supabaseUrl = "https://lxwbvgjhuxojvjhdlzoo.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4d2J2Z2podXhvanZqaGRsem9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjY4NjYsImV4cCI6MjA0OTYwMjg2Nn0.muZHbxAeeWM8EpN4cvT6o2SFw06F3F_D9oXvnioZBrs"
// const supabase = createClient(supabaseUrl, supabaseKey);

// console.log(supabase);

// async function start(){

//   const { data, error } = await supabase.auth.signUp({
//     email: 'speedittnn@email.com',
//     password: 'helloami60',
//   })

//   console.log(data);
//   console.log(error);
// }

// start()

const apiKey = {
  users: "localhost:3000/users",
  doctor : "localhost:3000/users"
}

class BookApi{
  constructor(){

  }
  post(db,data){
    return axios.post(apiKey[db],data)
  }
  get(db){
    return axios.get(apiKey[db])
  }
  put(){

  }
  delete(){

  }
  getWithId(db,id){
    return axios.get(`${apiKey[db]}${id}`)
  }
}
export default BookApi