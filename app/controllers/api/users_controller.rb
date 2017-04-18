class Api::UsersController < ApplicationController

  def index
    @users = User.all
  end

  def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			render json: @user.errors, status: 422
		end
	end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user.find_by(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

	private

	def user_params
		params.require(:user).permit(:username, :password)
	end
end
