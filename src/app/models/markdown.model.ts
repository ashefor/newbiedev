export interface MarkdownOptions {
    showBorder?: boolean          // Show editor component's border. Default is true
    hideIcons?: Array<string>     // ['Bold', 'Italic', 'Heading', 'Refrence', 'Link', 'Image', 'Ul', 'Ol', 'Code', 'TogglePreview', 'FullScreen']. Default is empty
    usingFontAwesome5?: boolean   // Using font awesome with version 5, Default is false
    scrollPastEnd?: number        // The option for ace editor. Default is 0
    enablePreviewContentClick?: boolean  // Allow user fire the click event on the preview panel, like href etc. Default is false
    resizable?: boolean
    showPreviewPanel?: boolean
}