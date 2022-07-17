resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"
lua54 'yes'

client_scripts {
    "client/*.lua"
}

server_scripts {
    "@oxmysql/async.lua",
    "@oxmysql/lib/MySQL.lua"
}

ui_page "assets/index.html"
files {
    "assets/*"
}