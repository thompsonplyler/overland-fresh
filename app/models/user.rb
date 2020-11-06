class User < ApplicationRecord
    before_create :confirmation_token
    has_secure_password
    validates :firstname, presence: true
    validates :lastname, presence: true
  # validates :username, uniqueness: true
  # validates :username, length: { minimum: 4 }
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  def confirmation_token
    if self.confirm_token.blank?
        self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end

  end