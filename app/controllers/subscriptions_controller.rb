class SubscriptionsController < ApplicationController
  before_action :ensure_user!

  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save
      channel = @subscription.channel
      render "api/channel/show"
    else
      render json @subscription.errors, status: 422
    end
  end

  def destroy
    subscription = Subscription.find(params[:id])
    subscription.destroy
    render json: {}
  end

  private
  def subscription_params
    params.require(:subscription).permit(:user_id, :channel_id)
  end
end
