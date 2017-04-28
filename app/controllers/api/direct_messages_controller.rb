class Api::DirectMessagesController < ApplicationController

  def index
    @channels = current_user.subscribed_channels.includes(:members).includes(:creator).where(private: true)
    render 'api/channels/index'
  end

  def show
    @channel = Channel.find(params[:id])
    render 'api/channels/show'
  end

  def create
    dmCode = SecureRandom::urlsafe_base64(10);
    @dm = Channel.new(user_id: current_user.id, name: dmCode, private: true);

    if @dm.save
      members = params[:members].values;
      members.each do |member|
        Subscription.create(user_id: member[:id].to_i, channel_id: @dm.id)
      end

      members.each do |member|
        Pusher.trigger("dm_#{member[:id]}", "dm_created", {id: @dm.id})
      end

      @channel = @dm
      render 'api/channels/show'
    else
      render json: @dm.errors, status: 422
    end
  end


  private
  def dm_params
    params.require(:dm).permit(:name, :purpose, :description, :user_id, :private)
  end
end
