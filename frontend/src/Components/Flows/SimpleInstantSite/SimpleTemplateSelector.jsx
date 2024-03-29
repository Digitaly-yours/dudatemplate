import 'fontsource-roboto'
const { Select, MenuItem } = require("@material-ui/core")


function SimpleTemplateSelector(props) {
    return (
        <Select onClick={props.handleChange} name="templateId" defaultValue='0' value={props.form.templateId} disabled={props.updating}>
            <MenuItem value='0' color="secondary"><em>Pick a template:</em></MenuItem>
            <MenuItem value='1013306' color="secondary">Creative Portfolio</MenuItem>
            <MenuItem value='1008302' color="secondary">Ice Cream Shop</MenuItem>
            <MenuItem value='1005052' color="secondary">Soap & Suds</MenuItem>
            <MenuItem value='1002785' color="secondary">My Bicycle Blog</MenuItem>
            <MenuItem value='1240935' color="secondary">Electrician</MenuItem>
        </Select>
    )
}

export default SimpleTemplateSelector;