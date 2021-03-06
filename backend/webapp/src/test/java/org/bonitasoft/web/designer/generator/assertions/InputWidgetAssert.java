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
package org.bonitasoft.web.designer.generator.assertions;

import static java.lang.String.format;

import org.assertj.core.api.AbstractAssert;
import org.bonitasoft.web.designer.generator.parametrizedWidget.InputWidget;

/**
 * {@link InputWidget} specific assertions - Generated by CustomAssertionGenerator.
 */
public class InputWidgetAssert extends AbstractAssert<InputWidgetAssert, InputWidget> {

    /**
     * Creates a new </code>{@link InputWidgetAssert}</code> to make assertions on actual InputWidget.
     *
     * @param actual the InputWidget we want to make assertions on.
     */
    public InputWidgetAssert(InputWidget actual) {
        super(actual, InputWidgetAssert.class);
    }

    /**
     * An entry point for InputWidgetAssert to follow AssertJ standard <code>assertThat()</code> statements.<br>
     * With a static import, one's can write directly : <code>assertThat(myInputWidget)</code> and get specific assertion with code completion.
     *
     * @param actual the InputWidget we want to make assertions on.
     * @return a new </code>{@link InputWidgetAssert}</code>
     */
    public static InputWidgetAssert assertThat(InputWidget actual) {
        return new InputWidgetAssert(actual);
    }

    /**
     * Verifies that the actual InputWidget's labelPosition is equal to the given one.
     *
     * @param labelPosition the given labelPosition to compare the actual InputWidget's labelPosition to.
     * @return this assertion object.
     * @throws AssertionError - if the actual InputWidget's labelPosition is not equal to the given one.
     */
    public InputWidgetAssert hasLabelPosition(String labelPosition) {
        // check that actual InputWidget we want to make assertions on is not null.
        isNotNull();

        // we overrides the default error message with a more explicit one
        String errorMessage = format("\nExpected <%s> labelPosition to be:\n  <%s>\n but was:\n  <%s>", actual, labelPosition, actual.getLabelPosition());

        // check
        if (!actual.getLabelPosition().equals(labelPosition)) {
            throw new AssertionError(errorMessage);
        }

        // return the current assertion for method chaining
        return this;
    }

    /**
     * Verifies that the actual InputWidget's labelWidth is equal to the given one.
     *
     * @param labelWidth the given labelWidth to compare the actual InputWidget's labelWidth to.
     * @return this assertion object.
     * @throws AssertionError - if the actual InputWidget's labelWidth is not equal to the given one.
     */
    public InputWidgetAssert hasLabelWidth(int labelWidth) {
        // check that actual InputWidget we want to make assertions on is not null.
        isNotNull();

        // we overrides the default error message with a more explicit one
        String errorMessage = format("\nExpected <%s> labelWidth to be:\n  <%s>\n but was:\n  <%s>", actual, labelWidth, actual.getLabelWidth());

        // check
        if (actual.getLabelWidth() != labelWidth) {
            throw new AssertionError(errorMessage);
        }

        // return the current assertion for method chaining
        return this;
    }

    /**
     * Verifies that the actual InputWidget's placeholder is equal to the given one.
     *
     * @param placeholder the given placeholder to compare the actual InputWidget's placeholder to.
     * @return this assertion object.
     * @throws AssertionError - if the actual InputWidget's placeholder is not equal to the given one.
     */
    public InputWidgetAssert hasPlaceholder(String placeholder) {
        // check that actual InputWidget we want to make assertions on is not null.
        isNotNull();

        // we overrides the default error message with a more explicit one
        String errorMessage = format("\nExpected <%s> placeholder to be:\n  <%s>\n but was:\n  <%s>", actual, placeholder, actual.getPlaceholder());

        // check
        if (!actual.getPlaceholder().equals(placeholder)) {
            throw new AssertionError(errorMessage);
        }

        // return the current assertion for method chaining
        return this;
    }

    /**
     * Verifies that the actual InputWidget's type is equal to the given one.
     *
     * @param type the given type to compare the actual InputWidget's type to.
     * @return this assertion object.
     * @throws AssertionError - if the actual InputWidget's type is not equal to the given one.
     */
    public InputWidgetAssert hasType(String type) {
        // check that actual InputWidget we want to make assertions on is not null.
        isNotNull();

        // we overrides the default error message with a more explicit one
        String errorMessage = format("\nExpected <%s> type to be:\n  <%s>\n but was:\n  <%s>", actual, type, actual.getType());

        // check
        if (!actual.getType().equals(type)) {
            throw new AssertionError(errorMessage);
        }

        // return the current assertion for method chaining
        return this;
    }

    /**
     * Verifies that the actual InputWidget's value is equal to the given one.
     *
     * @param value the given value to compare the actual InputWidget's value to.
     * @return this assertion object.
     * @throws AssertionError - if the actual InputWidget's value is not equal to the given one.
     */
    public InputWidgetAssert hasValue(String value) {
        // check that actual InputWidget we want to make assertions on is not null.
        isNotNull();

        // we overrides the default error message with a more explicit one
        String errorMessage = format("\nExpected <%s> value to be:\n  <%s>\n but was:\n  <%s>", actual, value, actual.getValue());

        // check
        if (!actual.getValue().equals(value)) {
            throw new AssertionError(errorMessage);
        }

        // return the current assertion for method chaining
        return this;
    }

}
