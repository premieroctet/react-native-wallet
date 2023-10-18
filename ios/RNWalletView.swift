import ExpoModulesCore
import PassKit

class RNWalletView: ExpoView {
    let onButtonPress = EventDispatcher()
    
    var needsUpdate = true
    var buttonView: PKAddPassButton?
    var style: ButtonStyle = .black {
        didSet {
            buttonView?.addPassButtonStyle = .blackOutline
            createButton()
        }
    }
    
    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        createButton()
    }
    
    private func createButton() {
        buttonView?.removeFromSuperview()
        buttonView = PKAddPassButton(addPassButtonStyle: style.toPkAddPassButtonStyle())
        
        buttonView!.addTarget(self, action: #selector(onPkAddPassButtonPress), for: .touchUpInside)
        
        addSubview(buttonView!)
    }
    
    override func layoutSubviews() {
        buttonView?.frame = bounds
    }
    
    @objc
    func onPkAddPassButtonPress() {
        onButtonPress()
    }
}
