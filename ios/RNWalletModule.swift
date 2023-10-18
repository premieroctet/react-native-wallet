import ExpoModulesCore
import PassKit

public class RNWalletModule: Module {
    let passLibrary = PKPassLibrary()
    let walletPass = RNWalletPass()
    
    public func definition() -> ModuleDefinition {
        Name("RNWallet")
        
        Constants {
            let passButton = PKAddPassButton()
            
            return [
                "buttonLayout": [
                    "baseWidth": passButton.frame.width,
                    "baseHeight": passButton.frame.height
                ]
            ]
        }
        
        Function("canAddPasses") {
            return PKAddPassesViewController.canAddPasses()
        }
        
        AsyncFunction("addPass") { (url: URL, promise: Promise) in
            walletPass.addPass(url: url) { exists, error in
                if (error != nil) {
                    promise.reject(error!)
                } else {
                    promise.resolve(exists)
                }
            }
        }.runOnQueue(.main)
        
        AsyncFunction("hasPass") { (url: URL, promise: Promise) in
            walletPass.hasPass(url: url) { hasPass, error in
                if (error != nil) {
                    promise.reject(error!)
                } else {
                    promise.resolve(hasPass)
                }
            }
            
        }
        
        AsyncFunction("removePass") { (url: URL, promise: Promise) in
            walletPass.removePass(url: url) { error in
                if (error != nil) {
                    promise.reject(error!)
                } else {
                    promise.resolve()
                }
            }
        }
        
        View(RNWalletView.self) {
            Events("onButtonPress")
            
            Prop("buttonStyle") { (view: RNWalletView, style: ButtonStyle?) in
                if (view.style != style) {
                    view.style = style ?? .black
                }
            }
        }
    }
}
