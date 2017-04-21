class Api::SubscriptionsController < ApplicationController
  before_action :ensure_user!

  def index
    @subscribed_channels = current_user.subscribed_channels
  end

  def create
    @channel = Channel.find(param[:id])
    current_user.subscribed_channels = @channel

    @subscribed_channels = current_user.subscribed_channels
    render :index
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.members.delete(current_user)

    @subscribed_channels = current_user.subscribed_channels
    render :index
  end
end
