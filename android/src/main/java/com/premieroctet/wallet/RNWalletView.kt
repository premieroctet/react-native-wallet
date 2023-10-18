package com.premieroctet.wallet

import android.content.Context
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import androidx.core.view.updateLayoutParams
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView


class RNWalletView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
    val onButtonPress by EventDispatcher()
    var buttonType: ButtonType = ButtonType.Primary
        set(value) {
            field = value

            val buttonTypeResource = buttonTypeToResource(value)

            imageButtonView.setImageResource(buttonTypeResource.resourceId)
        }

    private fun buttonTypeToResource(buttonType: ButtonType): ButtonTypeResource {
        return when (buttonType) {
            ButtonType.Primary -> ButtonTypeResource.Primary
            ButtonType.Condensed -> ButtonTypeResource.Condensed
        }
    }

    private val imageButtonView = ImageButton(context).also {
        val buttonTypeResource = buttonTypeToResource(buttonType)
        Log.v("RNWallet", "Button width is " + buttonTypeResource.width)
        it.layoutParams = LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)
        it.isClickable = true;
        it.setImageResource(buttonTypeResource.resourceId)
        it.setBackgroundResource(R.drawable.googlewallet_button_background)

        it.setOnClickListener {
            onButtonPress(emptyMap())
        }

        addView(it)
    }
}
