var CustomPropertyChartSeriesVisibilityExtension = (function () {
    var Model = DevExpress.Dashboard.Model;
    var Designer = DevExpress.Dashboard.Designer;

    // 1. Model
    const enableLegendClick = {
        ownerType: Model.ChartItem,
        propertyName: "LegendClickEnabled",
        defaultValue: false,
        valueType: 'boolean'
    };

    Model.registerCustomProperty(enableLegendClick);

    // 2. Viewer
    function onItemWidgetOptionsPrepared(args) {
        if (args.dashboardItem.customProperties.getValue(enableLegendClick.propertyName)) {
            args.options.onLegendClick = function (e) {
                if (e && e.target && args.dashboardItem.customProperties.getValue(enableLegendClick.propertyName)) {
                        var _legendSeriesPrefix = '__legend__series__';
                        var seriesName = e.target.name;
                        var seriesDisplayName = seriesName.indexOf(_legendSeriesPrefix) !== -1 ? seriesName.replace(_legendSeriesPrefix, "") : seriesName;
                        var ss = e.component.getSeriesByName(seriesDisplayName);
                        if (ss.isVisible())
                            ss.hide();
                        else
                            ss.show();
                    }
                }

        }
    }

    // 3. Designer
    function onCustomizeSections(args) {
        if (args.dashboardItem instanceof Model.ChartItem) {
            args.addSection({
                title: "Enable Legend Click",
                items: [
                    {
                        dataField: enableLegendClick.propertyName,
                        editorType: "dxCheckBox",
                        label: { visible: false },
                        editorOptions: {
                            text: "Enabled",
                        }
                    }
                ]
            })
        }
    }

    // 4. Event Subscription
    function CustomPropertyChartSeriesVisibilityExtension(dashboardControl) {
        this.name = "CustomPropertyChartSeriesVisibilityExtension";
        this.start = function () {
            let viewerApiExtension = dashboardControl.findExtension('viewer-api');
            if (viewerApiExtension) {
                viewerApiExtension.on('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
            }
            let bindingPanelExtension = dashboardControl.findExtension("item-options-panel");
            if (bindingPanelExtension) {
                bindingPanelExtension.on('customizeSections', onCustomizeSections);
            }
        };
        this.stop = function () {
            let viewerApiExtension = dashboardControl.findExtension('viewer-api');
            if (viewerApiExtension) {
                viewerApiExtension.off('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
            }
            let bindingPanelExtension = dashboardControl.findExtension("item-options-panel");
            if (bindingPanelExtension) {
                bindingPanelExtension.off('customizeSections', onCustomizeSections);
            }
        }
    }
    return CustomPropertyChartSeriesVisibilityExtension;
}());