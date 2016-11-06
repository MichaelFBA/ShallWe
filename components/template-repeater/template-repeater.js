class TemplateRepeater extends HTMLElement {

    attachedCallback() {
        this.template = this;
        this.render(this.getAttribute('content'));
    }

    render(val) {
        const renderError = "Content should be an Array of objects.";
        let template      = this.template;
        let content       = TemplateRepeater.fromJson(val);
        this.innerHTML = (Array.isArray(content) ? content.map(andApplyTemplate) : new Error(renderError).message).join('') ;

        function andApplyTemplate(item){
            return TemplateRepeater.interpolate(template.cloneNode(true), item);
        }


        return this.innerHTML;
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if(name === "content" && typeof oldVal === 'string') {
            this.setAttribute('content', '');
            this.render(newVal);
        }
    }

    static interpolate(template, content) {
        let contentArr = Object.keys(content);
        let updatedHTML = "";

        if (typeof content == "object") {

            contentArr.forEach(andIterateOverData);

            function andIterateOverData(item){
                template.innerHTML = template.innerHTML.replace("${" + item + "}", content[item]);
            }

            updatedHTML += template.innerHTML;
        }

        return updatedHTML;

    }

    static fromJson(str) {
        let obj = null;
        if (typeof str == "string") {
            try { obj = JSON.parse(str);
            } catch (e) { throw new Error("Invalid JSON string provided. "); }
        }
        return obj;
    }
}

document.registerElement("template-repeater", TemplateRepeater);
