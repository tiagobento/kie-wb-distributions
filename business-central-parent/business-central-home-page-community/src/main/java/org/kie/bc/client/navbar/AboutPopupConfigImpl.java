/*
 * Copyright 2017 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.kie.bc.client.navbar;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.jboss.errai.ui.client.local.spi.TranslationService;
import org.kie.bc.client.resources.i18n.Constants;
import org.kie.workbench.common.widgets.client.popups.about.AboutPopupConfig;

@ApplicationScoped
public class AboutPopupConfigImpl implements AboutPopupConfig {

    @Inject
    private TranslationService translationService;

    @Override
    public String productName() {
        return translationService.format(Constants.ProductName);
    }

    @Override
    public String productVersion() {
        return "${version.org.kie.workbench.app}";
    }

    @Override
    public String productLicense() {
        return translationService.format(Constants.License);
    }

    @Override
    public String productImageUrl() {
        return "images/business-central.png";
    }

    @Override
    public String backgroundImageUrl() {
        return "images/community_home_bg.jpg";
    }
}
