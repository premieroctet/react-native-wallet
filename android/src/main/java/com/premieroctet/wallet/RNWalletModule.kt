package com.premieroctet.wallet

import android.app.Activity
import android.util.Log
import com.google.android.gms.pay.Pay
import com.google.android.gms.pay.PayApiAvailabilityStatus
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

import com.google.android.gms.pay.PayClient;
import expo.modules.kotlin.Promise;
import expo.modules.kotlin.exception.CodedException

class RNWalletModule : Module() {
  private lateinit  var walletClient: PayClient
  private val addToGoogleWalletRequestCode = 18760
  private var addPassPromise: Promise? = null

  override fun definition() = ModuleDefinition {
    Name("RNWallet")

    Constants(
      "buttonLayout" to mapOf(
        "baseWidthPrimary" to ButtonTypeResource.Primary.width,
        "baseWidthCondensed" to ButtonTypeResource.Condensed.width,
        "baseHeight" to 48
      )
    )

    AsyncFunction("canAddPasses") { promise: Promise ->
      walletClient.getPayApiAvailabilityStatus(PayClient.RequestType.SAVE_PASSES)
        .addOnSuccessListener { status ->
          if (status == PayApiAvailabilityStatus.AVAILABLE) {
            promise.resolve(true)
          } else {
            promise.resolve(false)
          }
        }
        .addOnFailureListener { exception: Exception ->
          promise.reject(CodedException(exception))
        }
    }

    AsyncFunction("addPass") { jwt: String, promise: Promise ->
      if (appContext.currentActivity == null) {
        promise.reject(CodedException("Current activity not found"))
        return@AsyncFunction
      }
      walletClient.savePasses(jwt, appContext.currentActivity!!, addToGoogleWalletRequestCode)
      addPassPromise = promise
    }

    AsyncFunction("addPassWithSignedJwt") { jwt: String, promise: Promise ->
      if (appContext.currentActivity == null) {
        promise.reject(CodedException("Current activity not found"))
        return@AsyncFunction
      }
      walletClient.savePassesJwt(jwt, appContext.currentActivity!!, addToGoogleWalletRequestCode)
      addPassPromise = promise
    }

    OnCreate {
      if (appContext.reactContext != null) {
        walletClient = Pay.getClient(appContext.reactContext!!.applicationContext)
      }
    }

    View(RNWalletView::class) {
      Events("onButtonPress")

      Prop("buttonType") { view: RNWalletView, buttonType: ButtonType? ->
        view.buttonType = buttonType ?: ButtonType.Primary
      }
    }

    OnActivityResult {_, payload ->
      if (payload.requestCode == addToGoogleWalletRequestCode) {
        when (payload.resultCode) {
          Activity.RESULT_OK -> {
            addPassPromise?.resolve(true)
          }
          Activity.RESULT_CANCELED -> {
            addPassPromise?.resolve(false)
          }

          PayClient.SavePassesResult.SAVE_ERROR -> payload.data?.let { intentData ->
            val errorMessage = intentData.getStringExtra(PayClient.EXTRA_API_ERROR_MESSAGE)

            Log.e("RNWallet", errorMessage ?: "Error after save")

            addPassPromise?.reject(CodedException(errorMessage))
          }

          else -> {
            addPassPromise?.reject(CodedException("An unknown error occurred when adding the pass"))
          }
        }

        addPassPromise = null
      }
    }
  }
}
