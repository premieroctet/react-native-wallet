package com.premieroctet.wallet

import expo.modules.kotlin.types.Enumerable

enum class ButtonType(val value: Int) : Enumerable {
    Primary(0),
    Condensed(1)
}

enum class ButtonTypeResource(val resourceId: Int, val width: Int) {
    Primary(R.drawable.add_to_googlewallet_button_content, 300),
    Condensed(R.drawable.badge_add_to_googlewallet_button_content, 200)
}
