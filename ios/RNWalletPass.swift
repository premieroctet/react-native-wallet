//
//  RNWalletPass.swift
//  RNWallet
//
//  Created by Hugo FOYART on 16/10/2023.
//

import Foundation
import PassKit
import ExpoModulesCore

class RNWalletPass: NSObject, PKAddPassesViewControllerDelegate {
    typealias AddPassCallback = (Bool, Exception?) -> Void
    typealias RemovePassCallback = (Exception?) -> Void
    typealias HasPassCallback = (Bool, Exception?) -> Void
    
    var addPassCallback: AddPassCallback?
    let passLibrary: PKPassLibrary = PKPassLibrary()
    var passBeingAdded: PKPass?

    private func getPass(url: URL) -> PKPass? {
        do {
            let passData = try Data.init(contentsOf: url)
            
            let pkPass = try PKPass(data: passData)
            
            return pkPass
        } catch {
            return nil
        }
    }
    
    func addPass(url: URL, callback: @escaping AddPassCallback) {
        guard let pass = self.getPass(url: url) else {
            callback(false, Exception(name: "getPass", description: "Cannot get pass from URL"))
            return
        }
        guard let window = UIApplication.shared.keyWindow else {
            fatalError("Unable to find root view controller")
        }
        
        guard let pkAddPassVc = PKAddPassesViewController(pass: pass) else {
            callback(false, Exception(name: "PKAddPassesViewController", description: "Could not initialize PKAddPassesViewController, make sure your pkpass is valid"))
            return
        }
        
        pkAddPassVc.delegate = self
        
        self.passBeingAdded = pass
        self.addPassCallback = callback
        
        var rootVc = window.rootViewController
        
        // Handle nested modals
        while rootVc?.presentedViewController != nil {
            rootVc = rootVc?.presentedViewController
        }
        
        rootVc?.present(pkAddPassVc, animated: true)
    }
    
    func removePass(url: URL, callback: RemovePassCallback) {
        guard let pass = self.getPass(url: url) else {
            callback(Exception(name: "getPass", description: "Cannot get pass from URL"))
            return
        }
        
        self.passLibrary.removePass(pass)
        callback(nil)
    }
    
    func hasPass(url: URL, callback: HasPassCallback) {
        guard let pass = self.getPass(url: url) else {
            callback(false, Exception(name: "getPass", description: "Cannot get pass from URL"))
            return
        }
        
        callback(self.passLibrary.containsPass(pass), nil)
        
    }
    
    func addPassesViewControllerDidFinish(_ controller: PKAddPassesViewController) {
        controller.dismiss(animated: true) {
            guard self.addPassCallback != nil && self.passBeingAdded != nil else {
                return
            }
            
            self.addPassCallback!(self.passLibrary.containsPass(self.passBeingAdded!), nil)
            self.passBeingAdded = nil
        }
    }
}
