var uiToggleElement = Object.create(HTMLInputElement.prototype);
uiToggleElement.attachedCallback  = function() {
    //window.addEventListener('mouseup', uiToggleElement.dragRelease, false);
    this.type = "checkbox";
    var toggle = document.createElement('span');
    toggle.setAttribute("data-on", this.checked );
    toggle.setAttribute("class", "uiToggleCheckbox");
    toggle.addEventListener("click", this.onToggle, false);
    var indicator = document.createElement('div');
    indicator.addEventListener('mousedown', uiToggleElement.dragRequest, false);       
    toggle.appendChild( indicator );
    if( this.parentNode ){
        this.parentNode.insertBefore(toggle, this);
    }
};
uiToggleElement.onDrag = function( event ){
    if( !event.target ){
        uiToggleElement.dragRelease();
        return;
    }
    var parent = event.target.parentNode.getBoundingClientRect();
    var newLeft = event.clientX - parent.left;
    if( parent.left < newLeft && 
        parent.left + event.target.parentNode.offsetWidth > newLeft + event.target.offsetWidth 
      ){
      event.target.style.left =  newLeft + 'px';
    }
};
uiToggleElement.dragRequest = function(event){
    //window.addEventListener('mousemove', uiToggleElement.onDrag, true);
}
uiToggleElement.dragRelease = function(){
    //window.removeEventListener('mousemove', uiToggleElement.onDrag, true);
};
uiToggleElement.onToggle = function( event ){
    var toggle = event.target.nextSibling ? event.target : event.target.parentNode;
    var status = toggle.getAttribute("data-on").toLowerCase() === 'true';
    toggle.setAttribute("data-on", !status );
    toggle.nextSibling.checked = !status;
};
uiToggleElement.toggleOn = function(){
    this.checked = true;
};
uiToggleElement.toggleOff = function(){
    this.checked = false;
};
window.uiToggle = document.registerElement('ui-toggle',{
  prototype: uiToggleElement,
  extends: 'input'
});
