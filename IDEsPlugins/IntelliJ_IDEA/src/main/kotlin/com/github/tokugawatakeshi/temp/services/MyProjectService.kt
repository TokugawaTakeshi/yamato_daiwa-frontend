package com.github.tokugawatakeshi.temp.services

import com.intellij.openapi.project.Project
import com.github.tokugawatakeshi.temp.MyBundle

class MyProjectService(project: Project) {

    init {
        println(MyBundle.message("projectService", project.name))
    }
}
