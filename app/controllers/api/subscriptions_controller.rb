class Api::SubscriptionsController < ApplicationController
  before_action :ensure_user!

  def index
    @subscribed_channels = current_user.subscribed_channels
  end

  def create
    @channel = Channel.find(params[:channelId])
    @subscription = Subscription.create(user_id: current_user.id, channel_id: @channel.id)
    if @subscription
      #should render current user again
      @user = current_user
      render 'api/users/show'
    else
      render json: @subscription.errors
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.members.delete(current_user)
    @user = current_user
    render 'api/users/show'
  end
end
