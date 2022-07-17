RegisterNUICallback("UpdateCrosshairData", function(data)
    StoreCrosshairData(data)
end)
RegisterNUICallback("CloseCrosshairConfig", function(data)
    CloseCrosshairConfig()
end)
function SendCrosshairData(data)
    SendNUIMessage({
        data = data
    })
end
function OpenCrosshairConfig()
    SendNUIMessage({
        toggleUI = true
    })
    SetNuiFocus(true, true)
end
function CloseCrosshairConfig()
    SetNuiFocus(false, false)
end
RegisterCommand("crosshair", function()
    OpenCrosshairConfig()
end, false)
function StoreCrosshairData(data)
    SetResourceKvp("crosshair-data", json.encode(data))
end
function LoadCrosshairData()
    local file = GetResourceKvpString("crosshair-data")
    if (file ~= nil) then
        local data = json.decode(file)
        SendCrosshairData(data)
    end
end
AddEventHandler("playerSpawned", function()
     LoadCrosshairData()
end)