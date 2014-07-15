Ext.define( "Phoenix.view.main.MainController",
	extend: "Ext.app.ViewController"
	requires: ["Ext.MessageBox"]
	alias: "controller.main"


	onClickButton: ->
		Ext.Msg.confirm( "Confirm", "Are you sure?", "onConfirm", @ )
		return


	onConfirm: (choice) ->
		return  if choice is "yes"

)