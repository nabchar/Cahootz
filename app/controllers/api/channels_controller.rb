class Api::ChannelsController < ApplicationController
  before_action :ensure_user!

  def index
    @channels = Channel.includes(:members).includes(:creator).where(private: false)
  end

  def show
    @channel = Channel.includes(:members).includes(:creator).find(params[:id])
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      Pusher.trigger("channels", "channel_created", {})

      render :show
    else
      render json: @channel.errors, status: 422
    end
  end

  def update
    @channel.find_by(params[:id])
    if @channel.update(channel_params)
      Pusher.trigger("channels", "channel_updated", {})
      render :show
    else
      render json: @channel.errors, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])

    if @channel.destroy
      Pusher.trigger("channels", "channel_deleted", {})
      render :show
    else
      render json: @channel.errors, status: 422
    end
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :purpose, :description, :user_id, :private)
  end
end
