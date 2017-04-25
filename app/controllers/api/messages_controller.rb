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
      #publish event
      Pusher.trigger("channel_#{@message.channel_id}",'message_published', {})

      render :show
    else
      render json: @message.errors
    end
  end

  def show

  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      #publish event
      Pusher.trigger('channel_' + @message.channel_id.to_s,'message_published', {})
      render :show
    else
      render json: @message.errors
    end
  end

  def destroy
    @message = current_user.messages.find(params[:id])
    if @message
      id = @message.id
      @message.destroy
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
