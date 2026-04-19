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
