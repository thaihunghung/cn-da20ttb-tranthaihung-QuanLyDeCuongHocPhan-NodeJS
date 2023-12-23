const Template = require('../models/Template/Template');
const {mongooseToObject} = require('../util/mongoose');

exports.Template_Get = async (req, res) => {
    const template = await Template.find().sort({ order: 1 })
    const templates = template.map(mongooseToObject);
    try {
        res.render('admin/TempateUpdate', {
            templates 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
exports.Template_Update = async (req, res) => {
    const templateId = req.params.id;
    const updatedData = req.body;
  
    console.log('Received data:', { templateId, updatedData });
    try {
      // Update the template document in the database
      const updatedTemplate = await Template.findByIdAndUpdate(templateId, updatedData, { new: true });
  
      if (!updatedTemplate) {
        return res.status(404).json({ message: 'Template not found' });
      }
      res.json({ message: 'Template updated successfully', template: updatedTemplate });
    } catch (error) {
      console.error('Error updating template:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };