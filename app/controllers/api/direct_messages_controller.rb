class Api::DirectMessagesController < ApplicationController

  def index
    @channels = current_user.subscribed_channels.includes(:members).includes(:creator).where(private: true)
    render 'api/channels/index'
  end

  def create
    @dm = Channel.new(dm_params);
    @dm.private = true;

    if @dm.save
      members = params[:members];
      members.each do |member|
        Subscription.create(user_id: member.id, channel_id: dm.id)
      end
      Subscription.create(user_id: current_user.id, channel_id: dm.id)

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
