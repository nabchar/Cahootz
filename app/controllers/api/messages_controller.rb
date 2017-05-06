class Api::MessagesController < ApplicationController
  before_action :ensure_user!

  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.messages
  end

  def create
    @message = Message.new(message_params)
    @message.channel_id = params[:channel_id]
    @message.user_id = current_user.id

    if @message.save
      Pusher.trigger("channel_#{@message.channel_id}",'message_published', {id: @message.id})

      render :show
    else
      render json: @message.errors
    end
  end

  def show
    @message = Message.find(params[:id])
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      Pusher.trigger("channel_#{@message.channel_id}",'message_updated', {id: @message.id})
      render :show
    else
      render json: @message.errors
    end
  end

  def destroy
    @message = current_user.messages.find(params[:id])
    if @message
      channel_id = @message.channel_id;
      id = @message.id
      @message.destroy
      Pusher.trigger("channel_#{channel_id}",'message_deleted', {id: id})
      render json: {id: id}
    else
      render json: { base: "Cannot delete someone else's message" }
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id, :channel_id)
  end
end
