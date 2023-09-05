import AutomatonElementError from './AutomatonElementError';
import DFATransition from '../dfa/DFATransition';

export default class AutomatonTransitionInvalidInputTokenError extends AutomatonElementError {
  constructor(protected override element: DFATransition) {
    super(element);
  }

  override errorString(): string {
    return `Input token ${this.element.inputToken} is invalid`;
  }
}
