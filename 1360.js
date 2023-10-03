function unique_name_792 (text, link) {
        // panel 中需要用到的id
        const inputLinkId = getRandom('input-link')
        const inputTextId = getRandom('input-text')
        const btnOkId = getRandom('btn-ok')
        const btnDelId = getRandom('btn-del')

        // 是否显示“删除链接”
        const delBtnDisplay = this._active ? 'inline-block' : 'none'

        // 初始化并显示 panel
        const panel = new Panel(this, {
            width: 300,
            // panel 中可包含多个 tab
            tabs: [
                {
                    // tab 的标题
                    title: '链接',
                    // 模板
                    tpl: `<div>
                            <input id="${inputTextId}" type="text" class="block" value="${text}" placeholder="链接文字"/></td>
                            <input id="${inputLinkId}" type="text" class="block" value="${link}" placeholder="http://..."/></td>
                            <div class="w-e-button-container">
                                <button id="${btnOkId}" class="right">插入</button>
                                <button id="${btnDelId}" class="gray right" style="display:${delBtnDisplay}">删除链接</button>
                            </div>
                        </div>`,
                    // 事件绑定
                    events: [
                        // 插入链接
                        {
                            selector: '#' + btnOkId,
                            type: 'click',
                            fn: () => {
                                // 执行插入链接
                                const $link = $('#' + inputLinkId)
                                const $text = $('#' + inputTextId)
                                const link = $link.val()
                                const text = $text.val()
                                this._insertLink(text, link)

                                // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                                return true
                            }
                        },
                        // 删除链接
                        {
                            selector: '#' + btnDelId,
                            type: 'click',
                            fn: () => {
                                // 执行删除链接
                                this._delLink()

                                // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                                return true
                            }
                        }
                    ]
                } // tab end
            ] // tabs end
        })

        // 显示 panel
        panel.show()

        // 记录属性
        this.panel = panel
    }