local toggle = true
local radar = true
local playerHealth = 0
local playerArmor = 0
local talking = false
local gun, ammoAmount = false, 0
local isDead = false
local currentWeapon = nil
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)
		if toggle then
			local playerPedId = PlayerPedId() 
			playerHealth = GetEntityHealth(playerPedId) - 100
			playerArmor = GetPedArmour(playerPedId)
			talking = NetworkIsPlayerTalking(PlayerId())
			isDead = IsEntityDead(playerPedId)
			if isDead then
				playerHealth = 0
				playerArmor = 0
			end
			if not isDead then
				if IsPedArmed(playerPedId, 4) then
					currentWeapon = GetSelectedPedWeapon(playerPedId)
					gun, ammoAmount = GetAmmoInClip(playerPedId, currentWeapon) 
				end
				ammoAmount = ammoAmount * 5.5
				if ammoAmount > 100 then
					ammoAmount = 99
				end
			end
			if talking then
				talking = 100
			else
				talking = 0
			end
			SendNUIMessage({
				type = "updateStatusHud",
				show = toggle,
				varSetHealth = playerHealth,
				varSetArmor = playerArmor,
				varSetOxy = ammoAmount,
				varSetStress = talking,
			})
		end

	end
end)
Citizen.CreateThread(
	function()
		Citizen.Wait(4)
		local display = true
		TriggerEvent("logo:display", true)
	end
)
RegisterNetEvent("logo:display")
AddEventHandler(
	"logo:display",
	function(value)
		SendNUIMessage(
			{
				type = "logo",
				display = value,
				id = GetPlayerServerId(PlayerId())
			}
		)
	end
)