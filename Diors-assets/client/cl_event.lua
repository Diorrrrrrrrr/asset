Loaded = false
isPaused = false
Citizen.CreateThread(function()
	while true do
		if IsPauseMenuActive() and isPaused == false then
			isPaused = true
			SendNUIMessage({action = "toggle", show = false})
		elseif not IsPauseMenuActive() and isPaused == true then
			isPaused = false
			SendNUIMessage({action = "toggle", show = true})
		end		
		Citizen.Wait(1000)
	end
end)
RegisterNetEvent('ui:toggle')
AddEventHandler('ui:toggle', function(show)
	SendNUIMessage({action = "toggle", show = show})
end)
RegisterCommand("off", function()
     SendNUIMessage({action = "toggle", show = false})
end)
RegisterCommand("on", function()
     SendNUIMessage({action = "toggle", show = true})
end)