# frozen_string_literal: true

require "open3"
require "json"

module Howlongtobeat
  class GameTimesService
    PYTHON_SCRIPT = Rails.root.join("lib", "python", "howlongtobeat", "game_times.py").to_s
    PYTHON_BIN    = "python3"

    def initialize(game_name:)
      @game_name = game_name
    end

    def call
      cached = CacheService.get(@game_name)
      return { success: true, game: cached } if cached

      result = run_script
      CacheService.set(@game_name, result[:game]) if result[:success]
      result
    end

    private

    def run_script
      stdout, stderr, status = Open3.capture3(PYTHON_BIN, PYTHON_SCRIPT, @game_name)

      unless status.success?
        return { success: false, error: "Erro ao executar script Python: #{stderr.strip}" }
      end

      parsed = JSON.parse(stdout.strip, symbolize_names: true)

      if parsed[:error]
        return { success: false, error: parsed[:error] }
      end

      { success: true, game: parsed }
    rescue JSON::ParserError => e
      { success: false, error: "Retorno inválido do script Python: #{e.message}" }
    end
  end
end
