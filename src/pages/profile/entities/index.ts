export type MainInfoFormState = {
  avatar: string;
  userName: string;
  email: string;
  userBio: string;
  contactNumber: string;
};

export type PasswordFormState = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
  isViewOldPassword: false;
  isViewNewPassword: false;
  isViewRepeatPassword: false;
};
