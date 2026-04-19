# frozen_string_literal: true

module EpicGames
  class LibraryController < ApplicationController
    def index
      auth_code = params[:auth_code]

      if auth_code.blank?
        render json: { error: "auth_code não fornecido" }, status: :bad_request
        return
      end

      result = EpicGames::LibraryService.new(auth_code: auth_code).call

      if result[:success]
        render json: { library: result[:library] }
      else
        render json: { error: result[:error] }, status: :unprocessable_content
      end
    end
  end
end