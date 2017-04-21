class Api::ChannelsController < ApplicationController
  before_action :ensure_user!

  def index
    @channels = Channel.includes(:members).includes(:creator).all
  end

  def show
    @channel = Channel.includes(:members).find(params[:id])
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save
      render :show
    else
      render json: @channel.errors, status: 422
    end
  end

  def update
    @channel.find_by(params[:id])
    if @channel.update(channel_params)
      render :show
    else
      render json: @channel.errors, status: 422
    end
  end

  def destroy
    @channel = Channel.find(params[:id])

    if @channel.destroy
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  private
  def channel_params
    params.require(:channel).permit(:name, :purpose, :description, :user_id, :private)
  end
end
