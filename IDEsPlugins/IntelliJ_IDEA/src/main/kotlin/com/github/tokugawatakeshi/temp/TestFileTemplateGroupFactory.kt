package com.github.tokugawatakeshi.temp

import com.intellij.icons.AllIcons
import com.intellij.ide.fileTemplates.FileTemplateDescriptor
import com.intellij.ide.fileTemplates.FileTemplateGroupDescriptor
import com.intellij.ide.fileTemplates.FileTemplateGroupDescriptorFactory

class TestFileTemplateGroupFactory : FileTemplateGroupDescriptorFactory {
    override fun getFileTemplatesDescriptor(): FileTemplateGroupDescriptor {
        val groupDescriptor = FileTemplateGroupDescriptor("Test Template Group", AllIcons.FileTypes.AddAny)
        groupDescriptor.addTemplate(FileTemplateDescriptor("Layout (Yamato Daiwa Frontend).pug"))
        return groupDescriptor
    }
}
