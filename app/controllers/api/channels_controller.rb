class Api::ChannelsController < ApplicationController
  before_action :ensure_user!

  def index
    @channels = Channel.all
    render "api/channel/index"
  end

  def show
    @channel = Channel.find(params[:id])
    render "api/channel/show"
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render "api/channel/show"
    else
      render json: @channel.errors, status: 422
    end
  end

  def update
    @channel.find_by(params[:id])
    if @channel.update(channel_params)
      render "api/channel/show"
    else
      render json: @channel.errors, status: 422
    end
  end

  def destroy
    channel = Channel.find(params[:id])
    channel.destroy
    render json: {};
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :purpose, :description, :user_id, :private)
  end
end
