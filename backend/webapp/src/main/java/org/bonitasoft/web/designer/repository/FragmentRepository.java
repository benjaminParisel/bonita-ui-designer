/**
 * Copyright (C) 2015 Bonitasoft S.A.
 * Bonitasoft, 32 rue Gustave Eiffel - 38000 Grenoble
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2.0 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
package org.bonitasoft.web.designer.repository;

import com.google.common.base.Predicate;
import org.bonitasoft.web.designer.livebuild.Watcher;
import org.bonitasoft.web.designer.model.WidgetContainerRepository;
import org.bonitasoft.web.designer.model.fragment.Fragment;

import javax.inject.Inject;
import javax.inject.Named;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.google.common.collect.Collections2.filter;
import static com.google.common.collect.Lists.newArrayList;


@Named
public class FragmentRepository extends AbstractRepository<Fragment> implements WidgetContainerRepository<Fragment> {

    @Inject
    public FragmentRepository(
            @Named("fragmentsPath") Path path,
            @Named("fragmentFileBasedPersister") JsonFileBasedPersister<Fragment> persister,
            @Named("fragmentFileBasedLoader") JsonFileBasedLoader<Fragment> loader,
            BeanValidator validator,
            Watcher watcher) {
        super(path, persister, loader, validator, watcher);
    }

    @Override
    public String getComponentName() {
        return "fragment";
    }

    /**
     * Get fragment that don't use element with id given in argument
     * Check recursively to not get element that use element that use .... that use id
     */
    public List<Fragment> getAllNotUsingElement(final String id) {
        final List<String> fragmentsUsingElement = getFragmentsUsingElement(id);
        return new ArrayList(filter(getAll(), new Predicate<Fragment>() {

            @Override
            public boolean apply(Fragment fragment) {
                return !fragmentsUsingElement.contains(fragment.getId());
            }
        }));
    }

    /**
     * Get fragments ids using element given in argument.
     * Element could be a widget or a fragment
     *
     * @param id element id
     * @return fragments that uses element
     */
    private List<String> getFragmentsUsingElement(String id) {
        List<String> fragIds = newArrayList(id);
        for (Fragment fragment : findByObjectId(id)) {
            fragIds.addAll(getFragmentsUsingElement(fragment.getId()));
        }
        return fragIds;
    }

    @Override
    public List<Fragment> getArtifactsUsingWidget(String widgetId) {
        return this.findByObjectId(widgetId);
    }

    public Map<String, List<Fragment>> getArtifactsUsingWidgets(List<String> widgetIds) {
        return this.findByObjectIds(widgetIds);
    }

    public List<Fragment> getByIds(Set<String> fragmentsId) {
        List<Fragment> result = new ArrayList<>();
        for (String fragmentId : fragmentsId) {
            result.add(get(fragmentId));
        }
        return result;
    }
}
