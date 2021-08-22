const KeepStorage = fetch('http://192.168.1.4:8000/api/menu/')
    .then(res => res.json())
    .then(res => ({
        menu: res,
        findChildren(folder) {
            return this.menu.filter(item => item.fields.parent_folder == folder.pk)
        }
    }))

export default await KeepStorage