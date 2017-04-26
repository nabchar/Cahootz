class Api::SessionsController < ApplicationController
  def create
		@user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
			login(@user)
      #set status to active
      @user.active = true;

			render "api/users/show"
		else
			render(
        json: { base:["Invalid username/password combination"] },
        status: 401
      )
		end
	end

	def destroy
		@user = current_user
		if @user
      #set status to inactive
      @user.active = false;

			logout
			render json: {}
		else
			render(
        json: { base: ["Nobody signed in"]},
        status: 404
      )
		end
	end
end
