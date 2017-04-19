export const signUp = (user) => {
  return $.ajax({
    method: 'POST',
    url: 'api/users',
    data: user
  });
};

export const signIn = (user) => {
  return $.ajax({
    method: 'POST',
    url: 'api/session',
    data: user
  });
};

export const logOut = () => {
  debugger
  return $.ajax({
    method: 'DELETE',
    url: 'api/session'
  });
};
