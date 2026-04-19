module Howlongtobeat
  class GameTimesController < ApplicationController
    def show
      game_name = params[:name]

      if game_name.blank?
        render json: { error: "Parâmetro 'name' não fornecido" }, status: :bad_request
        return
      end

      result = Howlongtobeat::GameTimesService.new(game_name: game_name).call

      if result[:success]
        render json: { game: result[:game] }
      else
        render json: { error: result[:error] }, status: :unprocessable_content
      end
    end
  end
end
